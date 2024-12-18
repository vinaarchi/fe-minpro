
import * as React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from "next/image";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardText from "react-bootstrap/esm/CardText";

const EventList = () => {
  return (
    <div className="m-16">
      <div>
        <h1 className="font-ibrand text-5xl">Event Pilihan</h1>
      </div>
      <div className="pt-6">
        <Card style={{width: "20rem"}} className="border rounded-md shadow-md">
            <Image 
            src="/images/bernadya.jpg"
            alt="event1"
            width={400}
            height={400}
            />
            <CardBody className="space-y-2 m-4">
                <CardTitle className="font-ibrand text-3xl">Cinta Kala Senja</CardTitle>
                <CardText className="text-customMediumBlue">01 Maret - 02 Maret 2025</CardText>
                <CardText className="font-bold">Rp450.000</CardText>
                <hr />
                <CardTitle className="font-ibrand text-2xl">DBL Arena Surabaya</CardTitle>
            </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EventList;
