function Excel() {
  return (
    <div className="row">
      <div className="col-md-12 float-right mt-2">
        <button
          type="button"
          data-toggle="modal"
          data-target=""
          id="download"
          className="btn btn-primary btn-sm float-right ml-2"
        >
          Download
        </button>
        <span className="mt-1 ml-4 float-right">
          <input
            type="radio"
            className="form-check-input"
            value="pdf"
            name="report_type"
            checked=""
          />
          <span style={{ marginleft: "-4px" }}>PDF &amp; Preview</span>
        </span>
        <span className="mt-1 ml-4 float-right">
          <input
            type="radio"
            className="form-check-input"
            value="excel"
            name="report_type0"
          />
          <span style={{ marginleft: "-4px" }}>Excel</span>
        </span>
      </div>
    </div>
  );
}
export default Excel;
