import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, OverlayTrigger, Navbar, Button, Badge, Form, Nav, } from 'react-bootstrap';
import { PopoverJobDetail } from '../components/popoverJobDetail'
import { readAllJobs, readSomeJobs } from '../data/Jobs';
import { sortType } from '../data/SortType';
import { statusEntries } from '../data/Status';
import '../styles/bootstrap.min.css'
import '../styles/global.css'
import '../styles/popoverJobDetail.css'
import '../App.css';

export const Dashboard = () => {

    const [jobData, setJobData] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [, setShow] = useState(false);
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('created');
    const [order, setOrder] = useState('desc');
    const [len, setLen] = useState(0);
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        if (filter !== 'All') {
            readSomeJobs(filter, sort, order).then((r: any) => {
                setJobData(r);
            });
        } else {
            readAllJobs(sort, order).then((r: any) => {
                setJobData(r);
            });
        }
    }, [filter, order, refresh, sort])

    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.pageYOffset > 300) {
            setShowTopButton(true);
          } else {
            setShowTopButton(false);
          }
        });
      })

      
    let getBadge = (stat: any, dat: any) => {
        let color = '';
        switch (stat) {
            case 'Open': color = 'info'; break;
            case 'Applied': color = 'primary'; break;
            case 'Interview': color = 'success'; break;
            case 'Denied': color = 'danger'; break;
            case 'Closed': color = 'secondary'; break;
            case 'Blacklist': color = 'warning'; break;
        }
        return (
            <Badge id='badgeX1' pill bg={color} >
                {stat} {dat}
            </Badge>
        )
    }

    const handleFilterChange = (e: any) => {
        setFilter(e.value);
    }

    const handleSortChange = (e: any) => {
        setSort(sortType.find(s => s.item === e.value).field);
        setOrder(sortType.find(s => s.item === e.value).order);
    }

    const handleFindChange = (e: any) => {

        if (e.length < len) {
            readAllJobs(sort, order).then((r: any) => {
                setJobData(r);
            });
        }
        setLen(e.length);

        let retValue: any[] = [];

        jobData.forEach(element => {
            if (element.jobDescription.toLowerCase().includes(e.toLowerCase()) || element.company.toLowerCase().includes(e.toLowerCase())) {
                retValue.push(element);
            }
            setJobData(retValue);
        });
    }


    const scrollToTop = () => {
        window.scrollTo({
            top: -10,
            behavior: 'smooth'
        });
    };

    return (
        <Container>
            <Navbar sticky='top' expand='sm' style={{ background: '#f8f9fa' }} >
                <Container>
                    <Row>
                        <Nav>
                            <Col sm={2} md={2} >
                                <Navbar.Text>Filter</Navbar.Text>
                            </Col>
                            <Col sm={2} md={4}>
                                <Form.Select size="sm" onChange={(e: any) => handleFilterChange(e.target)}>
                                    {statusEntries.map((entry: any, index: any) => (
                                        <option id={index}>{entry.item}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col sm={2} md={2}>
                                <Navbar.Text>Sort</Navbar.Text>
                            </Col>
                            <Col sm={2} md={4}>
                                <Form.Select size="sm" onChange={(e: any) => handleSortChange(e.target)}>
                                    {sortType.map((entry: any, index: any) => (
                                        <option id={index}>{entry.item}</option>
                                    ))}
                                </Form.Select>
                            </Col>

                            <Col sm={2} md={2}>
                                <Navbar.Text>Find</Navbar.Text>
                            </Col>
                            <Col sm={2} md={4} lg={8}>
                                <Form.Control defaultValue={""} id='form-control' type="text" onChange={(e: any) => handleFindChange(e.target.value)} />
                            </Col>
                            <Col>
                                {showTopButton && (
                                    <Button variant={'transparent'} onClick={() => scrollToTop()} className="back-to-top" >
                                        <img className='back-to-top-img' alt="" src="https://img.icons8.com/fluency/48/000000/collapse-arrow.png" />
                                    </Button>
                                )}
                            </Col>
                        </Nav>
                    </Row>
                </Container>
            </Navbar>
            <hr />
            <Navbar fixed='bottom' expand='sm' >
                <Container >
                    <Col sm={5} />
                    <Col>
                        <OverlayTrigger
                            rootClose
                            delay={100}
                            key={0}
                            trigger="click"
                            placement="auto-start"
                            onExited={() => setRefresh(!refresh)}
                            overlay={PopoverJobDetail(true, '', '', '', '', '', '', 'Athens', 'Greece', '', 'Open', '', '', '')}>
                            <Button variant='light' style={{ background: 'transparent', borderColor: 'transparent' }} ><img alt="Add new Job" src="https://img.icons8.com/fluency/48/000000/add.png" /></Button>
                        </OverlayTrigger>
                    </Col>
                    <Col sm={5} />
                </Container>
            </Navbar >
            <br></br>
            <Row>
                {jobData.map(({ id, jobDescription, company, kontaktPerson, kontaktPhone, kontaktEmail, city, country, webAd, webCompany, created, remarks, status, index }) => (
                    <Col key={index} md={3}>
                        <OverlayTrigger
                            rootClose
                            delay={100}
                            key={index}
                            trigger="click"
                            placement="auto"
                            onExited={() => setRefresh(!refresh)}
                            overlay={PopoverJobDetail(false, id, jobDescription, company, kontaktPerson, kontaktPhone, kontaktEmail, city, country, remarks, status, webAd, webCompany, created)}
                        >
                            <Card key={index} onClick={(e: any) => setShow(true)}>
                                {getBadge(status, created)}
                                <Card.Header>
                                    <Card.Title>{jobDescription}</Card.Title>
                                    <Card.Text><b>{company}</b> {city} {country}</Card.Text>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text><a href={webAd} target="_blank" rel="noreferrer">Link to Advertisment {jobDescription} @ {company}</a></Card.Text>
                                    <Card.Text><a href={webCompany} target="_blank" rel="noreferrer">Link to Company @ {company}</a></Card.Text>
                                </Card.Body>
                            </Card>
                        </OverlayTrigger>
                    </Col>
                ))}
            </Row>
        </Container >
    )
}