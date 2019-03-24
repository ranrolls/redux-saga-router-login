import React from 'react'
import AppRoutes from '../../routes';
import PlainNav from '../../../lib/pages/components/layout/modules/menu/plain/index';
const TemplateOne = (props) => {
  const { redirect, redirectPath } = props
  return (
    <div>
      <header>
        <PlainNav />
      </header>
      <AppRoutes redirect={redirect} redirectPath={redirectPath} />
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
  )
}
export default TemplateOne
