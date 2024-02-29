// Purpose: Middleware to load layout component for each route
export async function loadLayoutMiddleware(route) {
  try {
    let layout = route.meta.layout
    let layoutComponent = await import(`@/layouts/${layout}.vue`)
    route.meta.layoutComponent = layoutComponent.default
  } catch (e) {
    console.error('Error occurred in processing of layouts: ', e)
    console.log('Mounted default layout - BaseLayout')
    let layout = 'BaseLayout'
    let layoutComponent = await import(`@/layouts/${layout}.vue`)
    route.meta.layoutComponent = layoutComponent.default
  }
}
