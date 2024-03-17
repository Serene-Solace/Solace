import { Button } from "@aws-amplify/ui-react";

type Props = {
    _isLoading: boolean;
    _invokeLambda: () => void;
}

const Toolbar: React.FC<Props> = (props) => {
    return (
      <div className="toolbar">
        <Button 
            variation="primary" 
            size="small" 
            isLoading={props._isLoading}
            onClick={() => props._invokeLambda()}
        >Define</Button>
      </div>
    );
  };

export default Toolbar;