import "@/style.css";

function IndexPopup() {
  return (
    <div className="w-72 rounded-lg font-serif">
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Website Preview</h1>
        <article className="text-sm text-gray-700">
          <h2 className="text-lg font-semibold mb-2">About this Extension</h2>
          <p className="mb-4">
            The Website Preview extension allows you to quickly and easily
            preview websites directly from your browser.{" "}
          </p>
          <h3 className="text-md font-medium mb-2">Key Features</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Quick previews of any website</li>
            <li>Seamless integration with your browser</li>
            <li>User-friendly interface</li>
          </ul>
        </article>
      </div>
    </div>
  );
}

export default IndexPopup;
