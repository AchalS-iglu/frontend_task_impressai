import React, { useEffect } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";
import { Table } from "antd";

function MainComponent(props) {
    const { getUsers, userState, addUser } = props;

    const handleSubmit = ({ name, email }) => {
        addUser({ name, email });
    };
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div id="main-container-wrapper" className="main-container-wrapper">
            <InputHandler onSubmit={handleSubmit} />
            <Table
                dataSource={userState.users}
                columns={[
                    {
                        title: "id",
                        dataIndex: "id",
                        key: "id",
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                        key: "email",
                    },
                ]}
                key={(record) => record.id}
                className="table-wrapper"
                bordered={true}
            />
        </div>
    );
}

export default MainComponent;
