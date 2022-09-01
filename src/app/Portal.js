import ReactDOM from 'react-dom'

const el = document.getElementById("modal");

const PlusModalPortal = ({ children }) => {
    return ReactDOM.createPortal(children, el);
};

const EditModalPortal = ({ children }) => {
    return ReactDOM.createPortal(children, el);
}

export { PlusModalPortal, EditModalPortal };