import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import BannerUpload from '../../assets/images/Banner_Upload_Image.svg';
import './ExplorePage.css';
import PlusButton from './PlusButton';
import Content from './Content';
import UploadButton from './UploadButton';
import PDFViewerSection from './PDFViewer';
import PDFViewer from '../../tab/pdfViewer';

const ExplorePage: React.FC = () => {

  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);
  const [pdfFileURL, setPdfFileURL] = useState<string | null>(null);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  useEffect(() => {
    console.log(pdfFile);
    if (pdfFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPdfFileURL(e.target.result as string);
        }
      };
      reader.readAsDataURL(pdfFile);
    }
  }, [pdfFile]);

  return (
    <>
      {!isUploadSuccessful ?
        <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={2}>
          <Grid item>
            <img src={BannerUpload} className="upload-page-banner-image" />
          </Grid>
          <Grid container item>
            {<Grid
              container
              item
              gridRow={4}
              md={pdfFile != undefined ? 6 : 12}
              justifyContent={'center'}
              alignItems={'center'}
              alignContent={'center'}
              direction={'column'}>
              <div className="upload-container">
                <div className="rectangle">
                  <Grid
                    item
                    container
                    justifyContent={'center'}
                    alignItems={'center'}
                    alignContent={'center'}
                    direction={'column'}>
                    <PlusButton setPdfFile={setPdfFile} />
                    <Content isFileUploaded={pdfFile !== undefined} fileName={pdfFile === undefined ? '' : pdfFile.name} />
                  </Grid>
                </div>
              </div>
              <UploadButton setIsUploadSuccessful={setIsUploadSuccessful} />
            </Grid>}
            {pdfFile != undefined &&
              <Grid md={6}>
                <PDFViewerSection pdfFileURL={pdfFileURL} />
              </Grid>}
          </Grid>
        </Grid>
        :
        <PDFViewer file={pdfFile} />
      }
    </>
  )
}

export default ExplorePage;