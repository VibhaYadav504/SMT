const PageContainer = ({ title, subtitle, children }) => {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-gray-500">
            {subtitle}
          </p>
        )}

      </div>

      {children}

    </div>
  );
};

export default PageContainer;