import { Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type PlusButtonProps = {
  setPdfFile: any;
  setPdfFileURL: any;
};

const PlusButton: React.FC<PlusButtonProps> = (props) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          props.setPdfFileURL(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      props.setPdfFile(file);
    }
  };

  return (
    <Grid item>
      <input type="file" id="actual-btn" accept=".pdf" onChange={(e) => handleFileChange(e)} hidden />
      <label htmlFor="actual-btn" className="button-plus"><AddIcon fontSize="large" /></label>
    </Grid>
  );
}

export default PlusButton;