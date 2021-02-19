import React from 'react';
import Notice from '../../Model/Notice';
// import { pdfjs, Document, Page } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function NoticeItem({notice= new Notice({})}){
    return (
        <div className="container notice-card ">
            <div className="row">
                <div className="col-12 col-md-8 p-md-1">
                    <span className="notice-title">
                        {notice.name}
                    </span>
                </div>
                <div className="col-12 col-md-2 p-md-1">
                    <span className="notice-date">
                        {notice.date}
                    </span>
                </div>
                <div className="col-12 col-md-2 p-md-1 d-flex justify-content-center">
                    <a href={notice.url}>
                        <button className="notice-download">DOWNLOAD</button>
                    </a>
                </div>
            </div>
        </div>
    )
}
/*<div className="row">
              <Document
                    file={'http://localhost:3000/file.pdf'}
                    //onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page className={"img-fluid"} pageNumber={1} />
                </Document>
            </div>*/
export default NoticeItem;