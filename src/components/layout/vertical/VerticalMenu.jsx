'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Next Imports
import { useParams } from 'next/navigation'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

import locale from "@configs/i18n"


// Component Imports
// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {

  console.log('dictionary', dictionary)

  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()
  const params = useParams()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href={`/${locale}/home`} icon={<i className='tabler-smart-home' />}>
          Dashboard
        </MenuItem>

        <SubMenu
          label="Job"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/job`}>Job List</MenuItem>
        </SubMenu>
        <SubMenu
          label="Quota"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/quota`}>Quota List</MenuItem>
        </SubMenu>
        <SubMenu
          label="Letter"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/letter/predemandletter`}>Pre Demand Letter</MenuItem>
          <MenuItem href={`/${locale}/letter/demandletter`}>Demand Letter</MenuItem>
        </SubMenu>
        <SubMenu
          label="E-Work Permit"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/ework`}>E-Work Permit List</MenuItem>
        </SubMenu>
        <SubMenu
          label="Employee"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/employee`}>Employee List</MenuItem>
        </SubMenu>
        <SubMenu
          label="Recalibration"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/recalibration`}>Recalibration List</MenuItem>
        </SubMenu>
        <SubMenu
          label="Review"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/review`}>Review List</MenuItem>
        </SubMenu>
        <SubMenu
          label="Consolar Service"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/consolarService/legalization`}>Legalization</MenuItem>
          <MenuItem href={`/${locale}/consolarService/passportService`}>Passport Service</MenuItem>
          <MenuItem href={`/${locale}/consolarService/certification`}>Certification</MenuItem>
          <MenuItem href={`/${locale}/consolarService/travelPermit`}>Travel Permit</MenuItem>
          <MenuItem href={`/${locale}/consolarService/appointmentBooking`}>Appointment Booking</MenuItem>
        </SubMenu>
        <SubMenu
          label="Leagal Aid"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/legalAid/adr`}>Adr</MenuItem>
          <MenuItem href={`/${locale}/legalAid/compensationClaim`}>Compensation Claim</MenuItem>
        </SubMenu>
        <MenuItem href={`/${locale}/flexiVisa`} icon={<i className='tabler-info-circle' />}>
          Flexi Visa
        </MenuItem>
        <MenuItem href={`/${locale}/dependentVisa`} icon={<i className='tabler-info-circle' />}>
          Dependent Visa
        </MenuItem>
        <MenuItem href={`/${locale}/airportService`} icon={<i className='tabler-info-circle' />}>
          Airport Service
        </MenuItem>
        <MenuItem href={`/${locale}/events`} icon={<i className='tabler-info-circle' />}>
          Events
        </MenuItem>
        <MenuItem href={`/${locale}/skillUpscale`} icon={<i className='tabler-info-circle' />}>
          Skill Upscale
        </MenuItem>
        <MenuItem href={`/${locale}/residency`} icon={<i className='tabler-info-circle' />}>
          Residency
        </MenuItem>
        <SubMenu
          label="Insurance"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/insurance/users`}>Insurance Users</MenuItem>
          <MenuItem href={`/${locale}/insurance/list`}>Insurance List</MenuItem>
        </SubMenu>
        <MenuItem href={`/${locale}/deadbodyTransportation`} icon={<i className='tabler-info-circle' />}>
        DeadBody Transport
        </MenuItem>
        <SubMenu
          label="Support"
          icon={<i className='tabler-smart-home' />}
          // suffix={<CustomChip label='3' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/support/list`}>Support List</MenuItem>
          <MenuItem href={`/${locale}/support/category`}>Support Category</MenuItem>
        </SubMenu>
        <MenuItem href='/settings' icon={<i className='tabler-info-circle' />}>
          Settings
        </MenuItem>
      </Menu>
      {/* <Menu
          popoutMenuOffset={{ mainAxis: 23 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
        </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
