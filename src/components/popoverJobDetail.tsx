import { Popover, Row, Col, Container, Button, FloatingLabel, Form } from "react-bootstrap";
import { JobData } from "../interface/IJobData";
import { deleteJob, saveJobData } from '../data/Jobs';
import { statusEntries } from "../data/Status";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/popoverJobDetail.css";

export const PopoverJobDetail = (add: boolean, id: any, jobDescription: any, company: any, kontaktPerson: any, kontaktPhone: any,
    kontaktEmail: any, city: any, country: any, remarks: any, status: any, webAd: any, webCompany: any, created: any) => {

    function HandleStatusChange(e: any) {
        status = e.target.value;
    }

    const saveHandler = () => {
        const jobdata: JobData = {
            id: id,
            jobDescription: jobDescription,
            company: company,
            kontaktPerson: kontaktPerson,
            kontaktPhone: kontaktPhone,
            kontaktEmail: kontaktEmail,
            city: city,
            country: country,
            remarks: remarks,
            status: status,
            webAd: webAd,
            webCompany: webCompany,
            created: created,
        }
        saveJobData(jobdata);
    }

    const deleteHandler = () => {
        if (window.confirm("Delete data?")) {
            deleteJob(id);
        }
    }

    return (
        <Popover id="popover-basic" >
            <Popover.Header>
                <Row>
                    <Col sm={6}>
                        <FloatingLabel controlId="floatingInputGrid" label="Job">
                            <Form.Control id='flGrey'
                                defaultValue={jobDescription} placeholder="Jobdescription" onChange={(e: any) => jobDescription = e.target.value} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInputGrid" label="Company">
                            <Form.Control id='flGrey'
                                defaultValue={company} placeholder="Company" onChange={(e: any) => company = e.target.value} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <Col>
                            <FloatingLabel controlId="floatingSelect" label="Status" onChange={(e: any) => HandleStatusChange(e)}>
                                <Form.Select id='flGrey' defaultValue={status} aria-label="Status" >
                                    {statusEntries.map((entry: any, index) => (
                                        <option value={entry.item} >{entry.item}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                        <FloatingLabel controlId="floatingInputGrid" label="Date">
                            <Form.Control id='flGrey'
                                defaultValue={(typeof created === 'string')?created:""} placeholder="YYYY/MM/DD" onChange={(e: any) => created = e.target.value} />
                        </FloatingLabel>
                        </Col>
                    </Col>
                </Row>
            </Popover.Header>
            <Popover.Body>
                <Row>
                    <Col>
                        <FloatingLabel controlId="floatingInputGrid" label="City">
                            <Form.Control
                                defaultValue={city} placeholder="City" onChange={(e: any) => city = e.target.value} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingInputGrid" label="Country">
                            <Form.Control
                                defaultValue={country} placeholder="Country" onChange={(e: any) => country = e.target.value} />
                        </FloatingLabel>
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel controlId="floatingInputGrid" label="Contact Person">
                            <Form.Control
                                defaultValue={kontaktPerson} placeholder="John Doe" onChange={(e: any) => kontaktPerson = e.target.value} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingInputGrid" label="Contact Phone">
                            <Form.Control
                                defaultValue={kontaktPhone} placeholder="Phone Number" onChange={(e: any) => kontaktPhone = e.target.value} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingInputGrid" label="Contact Mail">
                            <Form.Control defaultValue={kontaktEmail} placeholder="E-Mail" onChange={(e: any) => kontaktEmail = e.target.value} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <FloatingLabel controlId="floatingInputGrid" label="Remarks">
                            <Form.Control as="textarea"   defaultValue={remarks} placeholder="Remarks" onChange={(e: any) => remarks = e.target.value} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={11}>
                        <FloatingLabel controlId="floatingInputGrid" label="Job Advertisment">
                            <Form.Control defaultValue={webAd.toString()}
                                placeholder="Link to Job Ad"
                                onChange={(e: any) => webAd = e.target.value} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <a href={webAd}
                            target="_blank" rel="noreferrer">
                            <img id="linkSymbol" style={{minWidth:'1vw'}}  alt="Link to Web Advertisment" src="https://img.icons8.com/fluency/48/000000/link.png" />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col sm={11}>
                        <FloatingLabel controlId="floatingInputGrid" label="Company Website">
                            <Form.Control defaultValue={webCompany.toString()}
                                placeholder="Link to Company Website"
                                onChange={(e: any) => webCompany = e.target.value} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <a href={webCompany}
                            target="_blank" rel="noreferrer">
                            <img className="linkSymbol" style={{minWidth:'1vw'}} alt="Link to Web Advertisment" src="https://img.icons8.com/fluency/48/000000/link.png" />
                        </a>
                    </Col>
                </Row>
                <hr />
            </Popover.Body>
            <Container style={{ marginTop: '-1.5rem', marginBottom: '-1rem' }} >
                <Row>
                    <Col sm={4}>
                        <Button
                            variant='outline-danger1'
                            onClick={() => deleteHandler()} >
                            <img alt="Delete" src="https://img.icons8.com/fluency/48/000000/filled-trash.png" /></Button>
                    </Col>
                    <Col id="alignCenter" sm={4}>
                        <Button variant='outline-success1'><img alt="Edit" src="https://img.icons8.com/fluency/48/000000/edit.png" /></Button>
                    </Col>
                    <Col id="alignEnd" sm={4}>
                        <Button
                            variant='outline-success1'
                            onClick={() => saveHandler()} >
                            <img alt="Save" src="https://img.icons8.com/fluency/48/000000/save.png" />
                        </Button>
                    </Col>
                </Row>
                <br />
            </Container>
        </Popover >
    )
};
