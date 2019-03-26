import React from 'react'
import AppRoutes from '../../routes';
import PlainNav from '../../../lib/pages/components/layout/modules/menu/plain/index';
const TemplateOne = (props) => {
  return (
    <div>
      <header>
        <PlainNav {...props} />
      </header>
      <AppRoutes {...props} />
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
  )
}
export default TemplateOne
