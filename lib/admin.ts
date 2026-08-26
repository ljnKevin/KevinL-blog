import { env } from '~/env.mjs'

type AdminCheckUser = {
  primaryEmailAddressId: string | null
  emailAddresses: Array<{
    id: string
    emailAddress: string
  }>
  publicMetadata?: {
    siteOwner?: unknown
  }
}

function getAdminEmails() {
  return (env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false
  }

  return getAdminEmails().includes(email.toLowerCase())
}

export function isAdminUser(user: AdminCheckUser | null) {
  if (!user) {
    return false
  }

  if (user.publicMetadata?.siteOwner === true) {
    return true
  }

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress

  return (
    isAdminEmail(primaryEmail) ||
    user.emailAddresses.some((email) => isAdminEmail(email.emailAddress))
  )
}
