import React from 'react';

const ResponsiveSection = ({ 
  title,
  subtitle,
  children,
  className = '',
  titleAlignment = 'left',
  spacing = 'normal'
}) => {
  // Spacing variants
  const spacingClasses = {
    tight: 'space-y-4 sm:space-y-6',
    normal: 'space-y-6 sm:space-y-8',
    loose: 'space-y-8 sm:space-y-12'
  };

  // Title alignment variants
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <section className={`w-full px-4 sm:px-6 py-8 sm:py-12 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className={spacingClasses[spacing]}>
          {(title || subtitle) && (
            <div className={alignmentClasses[titleAlignment]}>
              {title && (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-base sm:text-lg text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

// Grid layout component for consistent responsive grids
export const ResponsiveGrid = ({
  children,
  columns = 2,
  className = ''
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid gap-6 lg:gap-8 ${gridCols[columns]} ${className}`}>
      {children}
    </div>
  );
};

// Text content wrapper for consistent text sizing
export const ResponsiveText = ({
  children,
  size = 'normal',
  className = ''
}) => {
  const textSizes = {
    small: 'text-sm sm:text-base',
    normal: 'text-base sm:text-lg',
    large: 'text-lg sm:text-xl'
  };

  return (
    <div className={`${textSizes[size]} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveSection;