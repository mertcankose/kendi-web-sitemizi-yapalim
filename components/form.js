import { useAuth0 } from '@auth0/auth0-react'

export default function Form({ onSubmit, text, setText }) {
  //hook
  const { loginWithPopup, logout, isAuthenticated, user } = useAuth0()

  return (
    <form className="mt-10" onSubmit={onSubmit}>
      <textarea
        onChange={(e) => setText(e.target.value)}
        rows="3"
        value={text}
        maxLength="100"
        placeholder="Leave a comment"
        className="w-full block border mb-4 resize-y px-2 py-1 bg-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />

      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <button className="buttons">Send</button>
          <img
            src={user.picture}
            width={30}
            className="rounded-full"
            alt="profile"
          />
          <span className="">{user.name}</span>
          <button
            type="button"
            className=""
            onClick={() =>
              logout({ returnTo: process.env.NEXT_PUBLIC_URL + '/posts' })
            }
          >
            x
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="buttons"
          onClick={() => loginWithPopup()}
        >
          Login
        </button>
      )}
    </form>
  )
}
