import { DateTime } from 'luxon'

export default function Comments({ comments }) {
  return (
    <div className="mt-10">
      {comments.map(({ id, createdAt, text, user }) => {
        return (
          <div key={id} className="flex items-center space-y-4 space-x-4">
            <img
              src={user.picture}
              alt={user.name}
              width={40}
              className="rounded-full"
            />

            <div className="">
              <div className="space-x-2">
                <b className="">{user.name}</b>{' '}
                <time className="text-sm text-gray-500">
                  {DateTime.fromMillis(createdAt).toRelative()}
                </time>
              </div>
              <p className="">{text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
