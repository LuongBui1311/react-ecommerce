import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import { CustomModalProps } from "../../props/CustomModalProps";

export default function CustomModal({
  title,
  visibility,
  setVisible,
  handleClick,
  actionKey,
  action,
  currentProductId,
  setSelectedFile,
}: CustomModalProps) {
  return (
    <Modal
      title={title}
      open={visibility}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button
          key={actionKey}
          type="primary"
          onClick={() => handleClick(currentProductId)}
        >
          {action}
        </Button>,
      ]}
    >
      {setSelectedFile && (
        <Upload
          beforeUpload={(file) => {
            setSelectedFile(file);
            return false;
          }}
          onRemove={() => setSelectedFile(null)}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      )}
    </Modal>
  );
}
