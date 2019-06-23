const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const ContactType = require('../types/contact_type')
const Contact = require('../../models/Contact')
const User = require('../../models/User')

const contactMutation = new GraphQLObjectType({
  name: 'ContactMutation',
  fields: {
    newContact: {
      type: ContactType,
      args: {
        owner_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(_, { owner_id, user_id, name }) {
        // create
        const contact = new Contact({
          owner_id,
          user_id,
          name
        }).save()

        // add to list(s)
        const user = User.findByID(owner_id)
        user.contacts.push(contact)

        // return newly created
        return contact
      }
    },
    deleteContact: {
      type: ContactType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        // find it
        const contact = Contact.findById(id)

        // remove from list(s)
        const user = User.findById(contact.owner_id)
        user.contacts.pull(contact)

        // remove
        return contact.remove()
      }
    },
    updateContact: {
      type: ContactType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(_, { id, name }) {
        return Contact.findByIdAndUpdate(id, {
          name
        })
      }
    }
  }
})

module.exports = contactMutation
