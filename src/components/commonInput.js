import React, { useState } from "react";
import { Button, Input } from "antd";
import { toast } from "sonner";
import { validateRecord } from "../lib/commonFunctions";

const InputHandler = ({ onSubmit, editMode = false }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        if (validateRecord({ name, email })) {
            setEmail("");
            setName("");
            onSubmit({ name, email });
        }
    };

    return (
        <form className="header-box" onSubmit={handleSubmit}>
            <div className="input-box">
                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <Button type="primary" htmlType="submit">
                Create User
            </Button>
        </form>
    );
};

export default InputHandler;
