import ButtonBlue from "../common/ButtonBlue/ButtonBlue";

type UploadProps = {
  setIsUploadSuccessful: any;
}

const UploadButton: React.FC<UploadProps> = (props) => {


  const handleClick = (e: any) => {
    props.setIsUploadSuccessful(true);
  };

  return (
    <>
      <ButtonBlue contentVal={"Upload File"} onClick={handleClick} />
    </>
  );
}

export default UploadButton;