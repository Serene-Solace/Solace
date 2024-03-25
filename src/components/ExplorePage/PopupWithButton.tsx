import React, { useState } from 'react';
import Toolbar from './ToolBar';
import { View } from '@aws-amplify/ui-react';
import './ExplorePage.css';

type ChildProps = {
  text: any;
  fileName: any;
  top: any;
  left: any;
}

const PopupWithButton: React.FC<ChildProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleExplore = async () => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_GATEWAY_KEY_ID;
      const response = await fetch('https://kahou06ob0.execute-api.ap-south-1.amazonaws.com/default/openai_invoke_api', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: props.text,
          fileName: props.fileName
        })
      });
      const data = await response.json();
      setResult(data['body']['response']);
    } catch (error) {
      console.error('Error fetching content:', error);
      setResult('Error fetching content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {result == '' && (
        <div
          className="popup"
          style={{
            position: 'fixed',
            top: props.top,
            left: props.left,
          }}
        >
          <Toolbar _invokeLambda={() => handleExplore()} _isLoading={loading} />
        </div>
      )}
      {result != '' && (
          <View
                as="div"
                className='rectangle'
                style={{
                  position: 'fixed',
                  top: props.top,
                  left: props.left,
                }}
                display="flex"
                width="fit-content"
                height="fit-content"
                ariaLabel="View example"
                backgroundColor="var(--amplify-colors-white)"
                borderRadius="6px"
                border="1px solid var(--amplify-colors-black)"
                color="var(--amplify-colors-blue-60)"
                maxWidth="20%"
                padding="1rem"
                onClick={() => alert('🏔 What a beautiful <View>! 🔭')}
              >
                {result}
              </View>
      )}
    </>
  );
};

export default PopupWithButton;