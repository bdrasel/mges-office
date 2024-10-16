'use client'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

import locale from '@configs/i18n'

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
  console.log(dictionary)

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

        <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
          Job
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Quata
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Letter
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          E-Work Permit
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Employee
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Recalibration
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Review
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Consolar Service
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Leagal Aid
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
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
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          Insurance
        </MenuItem>
        <MenuItem href='/test' icon={<i className='tabler-info-circle' />}>
          DeadBody Transport
        </MenuItem>
        <SubMenu
          label='Support'
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
