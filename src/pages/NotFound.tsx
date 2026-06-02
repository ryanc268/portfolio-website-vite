import { Helmet } from "react-helmet";

export const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <Helmet>
        <title>404 — Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <p className="font-montserrat text-cyan-custom text-7xl font-light md:text-9xl">
        404
      </p>
      <h1 className="font-montserrat mt-4 text-2xl text-white md:text-3xl">
        Page not found
      </h1>
    </div>
  );
};

export default NotFound;
