import * as React from "react";
import { ContactItem } from "./ContactItem";

export class ContactsList extends React.Component {
  contactToContactItem = contact => {
  const phone = contact.telecom.value;
  console.log(phone);
    const key = contact.id;
    return <ContactItem key={key} phone={phone} />;
  };

  render() {
    return (
      <ul className="ui relaxed divided list selection">
        {this.props.contacts.map(this.contactToContactItem)}
      </ul>
    );
  }
}
