import "./PasswordModal.css";

const PasswordModal = () => {
  return (
    <>
      <form>
        <div className="form-inputs">
          <input type="text" placeholder="Your email" />
        </div>
        <button className="continue-btn">Continue</button>
      </form>
    </>
  );
};

export default PasswordModal;
