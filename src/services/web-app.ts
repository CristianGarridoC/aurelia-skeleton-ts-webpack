export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    firstName:'John',
    lastName:'Tolkien',
    email:'tolkien@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id: 2,
    firstName:'Clive',
    lastName:'Lewis',
    email:'lewis@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id: 3,
    firstName:'Owen',
    lastName:'Barfield',
    email:'barfield@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id: 4,
    firstName:'Charles',
    lastName:'Williams',
    email:'williams@inklings.com',
    phoneNumber:'867-5309'
  },
  {
    id: 5,
    firstName:'Roger',
    lastName:'Green',
    email:'green@inklings.com',
    phoneNumber:'867-5309'
  }
];

export class WebAPI {
  public isRequesting: boolean = false;
  private readonly latency: number = 200;

  private get contacts(): Contact[] {
    return contacts;
  }
  private getId(): number{
    return this.contacts.length ? this.contacts[this.contacts.length - 1].id + 1 : 1;
  }

  public async getContactList(): Promise<Contact[]>{
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        const results: Contact[] = JSON.parse(JSON.stringify(this.contacts));
        resolve(results);
        this.isRequesting = false;
      }, this.latency);
    });
  }

  public async getContactDetails(id: number): Promise<Contact>{
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        const found: Contact[] = this.contacts.filter(x => x.id === id);
        if(found.length){
          resolve(JSON.parse(JSON.stringify(found[0])));
        }
        else {
          resolve(null);
        }
        this.isRequesting = false;
      }, this.latency);
    });
  }

  public async deleteContact(id: number): Promise<void>{
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        const findContact: number = this.contacts.findIndex((c: Contact) => c.id === id);
        if(findContact !== -1){
          this.contacts.splice(findContact, 1);
        }
        this.isRequesting = false;
        resolve();
      }, this.latency);
    });
  }

  public async saveContact(contact: Contact): Promise<Contact>{
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        const instance: Contact = JSON.parse(JSON.stringify(contact));
        const found: Contact[] = this.contacts.filter(x => x.id === contact.id);

        if(found.length){
          const index: number = this.contacts.indexOf(found[0]);
          this.contacts[index] = instance;
        }else{
          instance.id = this.getId();
          this.contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, this.latency);
    });
  }
}
