import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constans";


export default function DvoraneDodaj(){
    return(
    <>
    Dodavanje smjera
    <Row>
        <Col>
        <Link
        to={RouteNames.DVORANE_PREGLED}
        className="btn btn-danger siroko"
        >Odustani</Link>
        </Col>
    </Row>
    </>
    )





}