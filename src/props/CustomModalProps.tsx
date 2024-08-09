import { ModalProps } from "antd";
import { RcFile } from "antd/es/upload";
import { Dispatch, SetStateAction } from "react";

export interface CustomModalProps extends ModalProps {
  title: string;
  visibility: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  handleClick: (id: string | null) => void;
  actionKey: string;
  action: string;
  currentProductId: string | null;
  setSelectedFile?: Dispatch<SetStateAction<RcFile | null>>;
}
