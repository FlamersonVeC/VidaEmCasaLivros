import BookReturn from "@/lib/componets/book-return";
import { Fragment } from "react";

const returnBooks = ({params}) => {

    const {id} = params;

    return (
        <Fragment>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <BookReturn bookId={id}/>
            </div>
        </Fragment>
    )
}

export default returnBooks;