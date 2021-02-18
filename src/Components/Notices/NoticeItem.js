import React from 'react';
import Notice from '../../Model/Notice';
// import { pdfjs, Document, Page } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function NoticeItem({notice= new Notice({})}){
    return (
        <div className="container border rounded m-2">
            <div className="row">
                <div className="col-12">{notice.name}</div>
            </div>
            <div className="row">
                <div className="col-12">{notice.date}</div>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <a href={notice.url}>download</a>
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