import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login/Login";

test("renders Login without crashing", () => {
    render(
        <Router>
            <Login />
        </Router>)
    expect(screen.getByText("Log in")).toBeInTheDocument();
})

test("handles input changes correctly", () => {
    render(
        <Router>
            <Login />
        </Router>)
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testUser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPassword" } });

    expect(screen.getByPlaceholderText("Username").value).toBe("testUser")
    expect(screen.getByPlaceholderText("Password").value).toBe("testPassword")
})

// test("", () => {
//     render(<Login />)
// })