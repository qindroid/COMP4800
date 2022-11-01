import React from "react";

import { Row, Form, Col, Input, Button, message, Image } from "antd";
function CardDescription({ title, description }) {	
	return (
		<div className="card-description">
			<h2>{ title }</h2>
			<p>{ description }</p>
		</div>
	);
};

function CardBilling({ price, recurrency }) {
	return (
		<div className="card-billing">
			<p>
				<strong className="price">$ { price }</strong>
        <strong> / mo.</strong>
			</p>
			<p>
				<span className="recurrency">
					Billed Anually or	$ { recurrency }/monthly
				</span>
			</p>
		</div>
	);
};

function CardFeatures({ data }) {	
	return (
		<div className="card-features">
			<ul>
				{ 
					data.map((item, index) => {
						return (
							<li key={index}>{item}</li>
						)
					})
				}
			</ul>
		</div>
	);
};

function CardAction({clickMe}) {
	return (
    <div className="card-action">
      <Form.Item>
        {/* Click to login */}
        <Button type="primary" onClick={clickMe} htmlType="submit" block>
          Sign Up
        </Button>
      </Form.Item>
    </div>
  );
};

function PricingCard(props) {	
	const { 
    type,
    title,
    description,
    price,
    recurrency,
    mostPopular,
    data,
    clickMe
  } = props;
	
	return (
    <div className={`card pricing-card ${type}`}>
      {mostPopular ? <span className="most-popular">Most Popular</span> : null}
      <CardDescription title={title} description={description} />
      <CardBilling price={price} recurrency={recurrency} />
      <CardFeatures data={data} />
      <CardAction clickMe={clickMe} />
    </div>
  );
};
 
export default PricingCard;