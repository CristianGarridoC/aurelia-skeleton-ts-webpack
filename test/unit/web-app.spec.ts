import { Contact, WebAPI } from './../../src/services/web-app';

const contact: Contact = {
  id: 1,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
};

const contacts: Contact[] = [
  {
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }
];

describe('WebAPI', () => {
  let service: WebAPI;
  let storageContacts: Contact[];

  beforeEach(() => {
    service = new WebAPI();
    storageContacts = [];
    Object.defineProperty(service, 'contacts', {
      get: () => storageContacts
    });
    jasmine.clock().uninstall();
  });

  it('getContactList should retrieve a list of contacts', (done) => {
    jasmine.clock().install();
    const getContactsPromise = service.getContactList()
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    getContactsPromise.then((contactsFromMethod: Contact[]) => {
      expect(service.isRequesting).toBe(false);
      expect(contactsFromMethod).toBeTruthy();
      expect(contactsFromMethod.length).toBe(0);
      jasmine.clock().uninstall();
      done();
    });
  });

  it('getContactDetails should retrieve null when list of contacts is empty', (done) => {
    jasmine.clock().install();
    const getContactDetailsPromise = service.getContactDetails(1);
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    getContactDetailsPromise.then((contactFromMethod: Contact) => {
      expect(service.isRequesting).toBe(false);
      expect(contactFromMethod).toBeNull();
      jasmine.clock().uninstall();
      done();
    });
  });

  it('getContactDetails should retrieve contact when find it in the list of contacts', (done) => {
    storageContacts = [{...contact}];
    jasmine.clock().install();
    const getContactDetailsPromise = service.getContactDetails(1);
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    getContactDetailsPromise.then((contactFromMethod: Contact) => {
      expect(service.isRequesting).toBe(false);
      expect(contactFromMethod).toBeTruthy();
      expect(contactFromMethod.id).toBe(1);
      jasmine.clock().uninstall();
      done();
    });
  });

  it('deleteContact should delete contact when find it in the contacts list', (done) => {
    storageContacts = [{...contact}];
    jasmine.clock().install();
    const deleteContactPromise = service.deleteContact(1);
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    deleteContactPromise.then(() => {
      expect(service.isRequesting).toBe(false);
      expect(storageContacts.length).toBe(0);
      jasmine.clock().uninstall();
      done();
    });
  });

  it('deleteContact should leave contacts list as is when contact not exist in it', (done) => {
    storageContacts = [{...contact, id: 2}];
    jasmine.clock().install();
    const deleteContactPromise = service.deleteContact(1);
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    deleteContactPromise.then(() => {
      expect(service.isRequesting).toBe(false);
      expect(storageContacts.length).toBe(1);
      jasmine.clock().uninstall();
      done();
    });
  });

  it('saveContact should update contact when contact exist in contacts list', (done) => {
    storageContacts = [{...contact}];
    jasmine.clock().install();
    const saveContactPromise = service.saveContact({...contact, firstName: 'abc'});
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    saveContactPromise.then((contactFromPromise) => {
      expect(service.isRequesting).toBe(false);
      expect(contactFromPromise).toBeTruthy();
      expect(contactFromPromise.id).toBe(1);
      expect(contactFromPromise.firstName).toBe('abc');
      jasmine.clock().uninstall();
      done();
    });
  });

  it('saveContact should save contact when contact not exist in contacts list', (done) => {
    storageContacts = [{...contact}];
    jasmine.clock().install();
    const saveContactPromise = service.saveContact({...contact, id: null});
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    saveContactPromise.then((contactFromPromise) => {
      expect(service.isRequesting).toBe(false);
      expect(contactFromPromise).toBeTruthy();
      expect(contactFromPromise.id).not.toBe(1);
      expect(storageContacts.length).toBe(2);
      jasmine.clock().uninstall();
      done();
    });
  });

  it('saveContact should save contact with id one when contacts list is empty', (done) => {
    jasmine.clock().install();
    const saveContactPromise = service.saveContact({...contact, id: null});
    expect(service.isRequesting).toBe(true);
    jasmine.clock().tick(200);
    saveContactPromise.then((contactFromPromise) => {
      expect(service.isRequesting).toBe(false);
      expect(contactFromPromise).toBeTruthy();
      expect(contactFromPromise.id).toBe(1);
      expect(storageContacts.length).toBe(1);
      jasmine.clock().uninstall();
      done();
    });
  });

});
