import React, { useState } from "react";
import { Button, Input } from "antd";
import { toast } from "sonner";

const InputHandler = ({ onSubmit, editMode = false }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name && !email) {
            toast.error("Name and Email are required");
            return;
        } else if (!name) {
            toast.error("Name is required");
            return;
        } else if (!email) {
            toast.error("Email is required");
            return;
        } else if (
            !email.match(
                // eslint-disable-next-line no-useless-escape
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            )
        ) {
            toast.error("Invalid email address");
            return;
        }
        setEmail("");
        setName("");
        onSubmit({ name, email });
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
