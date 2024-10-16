// Next Imports
import { NextResponse } from 'next/server'

// Third-party Imports
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl, isUrlMissingLocale } from '@/utils/i18n'
import { ensurePrefix, withoutSuffix } from '@/utils/string'

// Constants
const HOME_PAGE_URL = '/home'

// Function to get locale from request
const getLocale = request => {
  const urlLocale = i18n.locales.find(locale => request.nextUrl.pathname.startsWith(`/${locale}`))

  if (urlLocale) return urlLocale

  const negotiatorHeaders = {}

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(i18n.locales)
  const locale = matchLocale(languages, i18n.locales, i18n.defaultLocale)

  return locale
}

// Function to handle localized redirects
const localizedRedirect = (url, locale, request) => {
  let _url = url
  const isLocaleMissing = isUrlMissingLocale(_url)

  if (isLocaleMissing) {
    _url = getLocalizedUrl(_url, locale ?? i18n.defaultLocale)
  }

  let _basePath = process.env.BASEPATH ?? ''

  _basePath = _basePath.replace('demo-1', request.headers.get('X-server-header') ?? 'demo-1')
  _url = ensurePrefix(_url, `${_basePath ?? ''}`)
  const redirectUrl = new URL(_url, request.url).toString()

  return NextResponse.redirect(redirectUrl)
}

// Middleware function
export default async function middleware(request) {
  // Determine the user's locale
  const locale = getLocale(request)
  const pathname = request.nextUrl.pathname

  // Allow the request to proceed
  return NextResponse.next()
}

// Matcher Config
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.+?/hook-examples|.+?/menu-examples|images|next.svg|vercel.svg).*)'
  ]
}
