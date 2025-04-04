import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

export default function ErrorModal({ show, onHide, errors }) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Ups!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {errors}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  ErrorModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    errors: PropTypes.array,
  };