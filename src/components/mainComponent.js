import React, { useEffect, useReducer, useState } from "react";
import InputHandler from "./commonInput";
import { Button, Form, Popconfirm, Table, Typography } from "antd";
import { EditableCell } from "./editableCell";
import { toast } from "sonner";
import { validateRecord } from "../lib/commonFunctions";

function formReducer(state, action) {
    switch (action.type) {
        case "CLEAR": {
            return {
                ...state,
                name: "",
                email: "",
            };
        }
        case "SET": {
            return {
                ...state,
                name: action.payload.name ?? state.name,
                email: action.payload.email ?? state.email,
            };
        }
        default:
            return state;
    }
}

function MainComponent(props) {
    const { getUsers, userState, addUser, deleteUser, editUser } = props;

    const [formState, formDispatch] = useReducer(formReducer, {
        name: "",
        email: "",
    });
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {};

    const cancel = () => {
        setEditingKey("");
    };

    console.log(editingKey);

    const save = async (e) => {
        e.preventDefault();
        try {
            if (validateRecord(formState)) {
                const row = {
                    name: formState.name,
                    email: formState.email,
                };
                await editUser(editingKey, row);
                setEditingKey("");
            }
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
            width: "35%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            editable: true,
            width: "35%",
        },
        {
            title: "operation",
            dataIndex: "operation",
            window: "15%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span className="table-actions-col">
                        <Button htmlType="submit" type="primary">
                            Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button>Cancel</Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <span className="table-actions-col">
                        <Button
                            disabled={editingKey !== ""}
                            onClick={() => {
                                formDispatch({ type: "CLEAR" });
                                setEditingKey(record.id);
                            }}>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Sure you want to delete?"
                            onConfirm={() => deleteUser(record.id)}>
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                    </span>
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
                inputOnChange: (e) => {
                    formDispatch({
                        type: "SET",
                        payload: { [col.dataIndex]: e.target.value },
                    });
                },
                inputValue: formState[col.dataIndex],
            }),
        };
    });

    return (
        <div id="main-container-wrapper" className="main-container-wrapper">
            <h1 className="main-heading">Impress.AI Assignment</h1>
            <InputHandler onSubmit={addUser} />
            <form component={false} onSubmit={save}>
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
                    size="middle"
                />
            </form>
        </div>
    );
}

export default MainComponent;
