import { Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type PlusButtonProps = {
    setPdfFile: any;
  };
  
  const PlusButton: React.FC<PlusButtonProps> = (props) => {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        props.setPdfFile(file);
      }
    };
  
    return(
      <Grid item>
        <input type="file" id="actual-btn" accept=".pdf" onChange={(e) => handleFileChange(e)}/>
        <label className="button-plus"><AddIcon fontSize="large"/></label>
      </Grid>
    );
  }

export default PlusButton;