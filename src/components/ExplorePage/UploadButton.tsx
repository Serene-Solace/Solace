import ButtonBlue from "../common/ButtonBlue/ButtonBlue";
import { uploadData } from 'aws-amplify/storage';

type UploadProps = {
  pdfFile: File | undefined;
  setIsUploadSuccessful: any;
}

const UploadButton: React.FC<UploadProps> = (props) => {

  const uploadBook = async () => {
    if (props.pdfFile) {
      try {
        const result = await uploadData({
          key: props.pdfFile.name,
          data: props.pdfFile,
          options: {
            contentType: props.pdfFile.type
          }
        }).result;
        console.log('Succeeded: ', result);
        props.setIsUploadSuccessful(true);
      } catch (error) {
        console.log('Error : ', error);
      }
    }
  };

  return (
    <>
      <ButtonBlue contentVal={"Upload File"} onClick={uploadBook} />
    </>
  );
}

export default UploadButton;