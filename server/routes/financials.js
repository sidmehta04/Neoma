const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
  // Get available financial documents
  router.get('/:companyId', async (req, res) => {
    try {
      const { companyId } = req.params;
      const statements = ['balance_sheet', 'income_statement', 'cash_flow', 'ratios'];
      
      const fileChecks = await Promise.all(statements.map(async (statementType) => {
        const { data, error } = await supabase.storage
          .from('financial_documents')
          .list(`financial_statements/${companyId}/${statementType}`, {
            limit: 10,
            sortBy: { column: 'name', order: 'desc' }
          });

        if (error) {
          console.error(`Error checking files for ${statementType}:`, error);
          return [statementType, []];
        }

        const csvFiles = data.filter(file => file.name.toLowerCase().endsWith('.csv'));
        return [statementType, csvFiles];
      }));

      const availableFiles = Object.fromEntries(fileChecks);
      res.json(availableFiles);
    } catch (error) {
      console.error('Error fetching financial documents:', error);
      res.status(500).json({ error: 'Failed to fetch financial documents' });
    }
  });

  // Get signed URL for download
  router.get('/:companyId/:statementType/download', async (req, res) => {
    try {
      const { companyId, statementType } = req.params;
      
      const { data: files, error: listError } = await supabase.storage
        .from('financial_documents')
        .list(`financial_statements/${companyId}/${statementType}`);

      if (listError) throw listError;

      const csvFiles = files.filter(file => file.name.toLowerCase().endsWith('.csv'));
      if (csvFiles.length === 0) {
        return res.status(404).json({ error: 'No files available' });
      }

      const mostRecentFile = csvFiles[0];
      const filePath = `financial_statements/${companyId}/${statementType}/${mostRecentFile.name}`;

      const { data: urlData, error: signError } = await supabase.storage
        .from('financial_documents')
        .createSignedUrl(filePath, 3600);

      if (signError) throw signError;

      res.json({ signedUrl: urlData.signedUrl });
    } catch (error) {
      console.error('Error generating download URL:', error);
      res.status(500).json({ error: 'Failed to generate download URL' });
    }
  });

  return router;
};