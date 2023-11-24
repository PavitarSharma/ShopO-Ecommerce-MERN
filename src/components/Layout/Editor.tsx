import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface IEditorProps {
  value: string;
  onChange: () => void;
}
const Editor = ({ value, onChange }: IEditorProps) => {
  return (
    <div className="">
      <ReactQuill theme="snow" value={value} onChange={onChange} className="" />
    </div>
  );
};

export default Editor;
