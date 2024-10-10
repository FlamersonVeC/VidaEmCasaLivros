import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function BookListUsers({ books }) {
  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li key={book.id} className="flex flex-col text-center bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-bold">{book.name}</h4>
          <div className='flex flex-row items-center justify-center gap-4'>
            <div>
              <Button asChild>
                <Link href={`/user/${book.link}`}>
                  usuário com o livro
                </Link>
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}