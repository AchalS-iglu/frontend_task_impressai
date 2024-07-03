import React, { useEffect, useState } from "react";
import InputHandler from "./commonInput";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import { EditableCell } from "./editableCell";

function MainComponent(props) {
    const { getUsers, userState, addUser, deleteUser, editUser } = props;

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            email: "",
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            editUser(key, row);
            setEditingKey("");
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            editable: false,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            editable: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            editable: true,
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div id="main-container-wrapper" className="main-container-wrapper">
            <InputHandler onSubmit={addUser} />
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={userState.users}
                    columns={mergedColumns}
                    key="id"
                    className="table-wrapper"
                    rowClassName="editable-row"
                    bordered={true}
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
}

export default MainComponent;
