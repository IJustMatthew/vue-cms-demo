import { ModifiedUser, User } from '@/types/user'

// Create monogram from name
export const getMonogramFromName = (name: string): string => {
  let monogram = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
  return monogram
}

// Add BG color by user role
export const addBGTypeByRole = (role: string): string => {
  let bgType = ''
  switch (role) {
    case 'admin':
      bgType = 'red'
      break
    case 'agent':
      bgType = 'blue'
      break
    case 'user':
      bgType = 'green'
      break
    default:
      bgType = 'green'
  }
  return bgType
}

// Convert basic user to modified user (extended with monogram, bgType, isSelected)
export const convertUser = (
  user: User,
  type: string,
  currentIndex: number
): ModifiedUser => {
  let convertedUser: ModifiedUser = {} as ModifiedUser

  // Two different cases: add and edit
  if (type === 'add') {
    convertedUser = {
      ...user,
      id: currentIndex + 1,
      monogram: getMonogramFromName(user.name),
      bgType: addBGTypeByRole(user.permission) as ModifiedUser['bgType'],
      isSelected: false,
    }
  } else if (type === 'edit') {
    convertedUser = {
      ...user,
      monogram: getMonogramFromName(user.name),
      bgType: addBGTypeByRole(user.permission) as ModifiedUser['bgType'],
      isSelected: false,
    }
  }

  return convertedUser
}

// Create paginated users - return an array with array chunks
export const createPaginatedUsers = (
  users: ModifiedUser[],
  perPage: number
) => {
  const paginatedUsers: ModifiedUser[][] = []
  for (let i = 0; i < users.length; i += perPage) {
    const chunk = users.slice(i, i + perPage)
    // do whatever
    paginatedUsers.push(chunk)
  }
  return paginatedUsers
}

// Select all user's checkbox
export const selectAllUserCheckbox = (
  users: ModifiedUser[],
  value: boolean
) => {
  return users.map((user) => {
    return {
      ...user,
      isSelected: value,
    }
  })
}

// Navigate sidebar triangle to the selected menu item
export const navigateToMenuItem = (item: string): void => {
  const selectedItem = document.getElementById(item)
  const sidebar = document.querySelector('.sidebar')
  document.getElementById('active_menu_arrow')!.style!.top = `${
    selectedItem!.offsetTop - sidebar!.scrollTop
  }px`
}
