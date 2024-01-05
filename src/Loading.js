import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Loading() {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="alert alert-info text-center" role="alert">
        Please wait a moment...
      </div>
    </div>
  );
}
