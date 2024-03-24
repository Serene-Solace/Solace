import { Grid } from "@mui/material";

type PDFViewerSectionProps = {
    pdfFileURL: any;
}

const PDFViewerSection: React.FC<PDFViewerSectionProps> = (props) => {

    return (
        <>
            <Grid>
                <div style={{ display: "flex" }}>
                    <iframe
                        title="S3 Content"
                        src={props.pdfFileURL}
                        width="700px"
                        height="550px"
                    ></iframe>
                </div>
            </Grid>
        </>
    );
}

export default PDFViewerSection;