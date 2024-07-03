import { Form, Input } from "antd";

export const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    inputOnChange,
    inputValue,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Input
                    name={dataIndex}
                    value={inputValue}
                    onChange={inputOnChange}
                    placeholder={`Enter ${title}`}
                />
            ) : (
                children
            )}
        </td>
    );
};
