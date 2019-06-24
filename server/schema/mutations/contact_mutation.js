const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const ContactType = require('../types/contact_type')
const Contact = require('../../models/Contact')
const User = require('../../models/User')

const contactMutations = {
  newContact: {
    type: ContactType,
    args: {
      owner_id: { type: GraphQLID },
      user_id: { type: GraphQLID },
      name: { type: GraphQLString }
    },
    resolve: (parent, data, context) => {
      const contact = new Contact(data)
      return User.findById(data.owner_id).then(user => {
        user.contacts.push(contact)
        return Promise.all([contact.save(), user.save()]).then(
          ([contact, user]) => {
            return contact
          }
        )
      })
    }
  },
  deleteContact: {
    type: ContactType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => {
      return Contact.findById(id).then(contact => {
        User.findById(contact.owner_id).then(user => {
          user.contacts.pull(contact)
          user.save()
        })
        return contact.remove()
      })
    }
  },
  updateContact: {
    type: ContactType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    },
    resolve: (_, data) => {
      return Contact.findById(data.id).then(contact => {
        contact.name = data.name || contact.name
        return contact.save()
      })
    }
  }
}

module.exports = contactMutations
