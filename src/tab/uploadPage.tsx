import React, { useState } from 'react';
import { uploadData, getUrl } from 'aws-amplify/storage';
import {
  Button,
  Flex,
  View,
} from "@aws-amplify/ui-react";

const UploadPage: React.FC = () => {

  const [fileUrl, setFileUrl] = useState<any>(null);

  const uploadBook = async (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const file = form.get("select-book");
    console.log(file);
    if (file) {
      try {
        const result = await uploadData({
          key: file.name,
          data: file,
          options: {
            contentType: file.type
          }
        }).result;
        console.log('Succeeded: ', result);
        const _url = await getUrl({ key: `${file.name}` });
        setFileUrl(_url.url);
      } catch (error) {
        console.log('Error : ', error);
      }
    }
  };

  return (
    <div>
      <h2>Upload Page</h2>
      <View as="form" margin="3rem 0" onSubmit={uploadBook}>
        <Flex direction="row" justifyContent="center">
          <View
            name="select-book"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
          <Button type="submit" variation="primary">
            Upload Book
          </Button>
        </Flex>
      </View>
      <div>
      {fileUrl && (
        <div>
          <div style={{display:"flex"}}>
              <iframe
                      title="S3 Content"
                      src={fileUrl}
                      width="100%"
                      height="1000px"
              ></iframe>
              <iframe
                        title="S3 Content"
                        src={fileUrl}
                        width="100%"
                        height="1000px"
                ></iframe>
              </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default UploadPage;