import React from 'react';
import { useDropzone } from 'react-dropzone';

function App() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input
          {...getInputProps()}
          directory=""
          webkitdirectory=""
          type="file"
        />{' '}
        <p>Dropzone without click events</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
export default App;
